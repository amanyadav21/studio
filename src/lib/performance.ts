/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and other performance metrics
 */

// Core Web Vitals Thresholds
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint - target 2.5s
  FID: 100,  // First Input Delay - target 100ms
  CLS: 0.1,  // Cumulative Layout Shift - target 0.1
  FCP: 1800, // First Contentful Paint - target 1.8s
  TTFB: 600, // Time to First Byte - target 600ms
};

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  dns?: number;
  tcp?: number;
  ttl?: number;
  resourceTiming?: PerformanceResourceTiming[];
}

/**
 * Report Web Vitals
 * Sends performance metrics to analytics or monitoring service
 */
export function reportWebVitals(metric: any) {
  // Send to analytics service
  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', metric.name, {
      event_category: 'web_vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}:`, metric.value);
  }
}

/**
 * Measure page performance metrics
 */
export function measurePerformance(): PerformanceMetrics {
  if (typeof window === 'undefined') return {};

  const perfData = window.performance.timing;
  const perfDataNavi = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  return {
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    tcp: perfData.connectEnd - perfData.connectStart,
    ttl: perfData.responseEnd - perfData.requestStart,
    fcp: perfDataNavi ? perfDataNavi.responseEnd - perfDataNavi.fetchStart : 0,
  };
}

/**
 * Check if metric is within acceptable range
 */
export function isMetricHealthy(metricName: keyof typeof THRESHOLDS, value: number): boolean {
  return value <= THRESHOLDS[metricName];
}

/**
 * Get performance grade (A, B, C, D, F)
 */
export function getPerformanceGrade(metrics: PerformanceMetrics): string {
  let healthyCount = 0;
  const totalMetrics = 5;

  if (metrics.lcp && isMetricHealthy('LCP', metrics.lcp)) healthyCount++;
  if (metrics.fid && isMetricHealthy('FID', metrics.fid)) healthyCount++;
  if (metrics.cls && isMetricHealthy('CLS', metrics.cls)) healthyCount++;
  if (metrics.fcp && isMetricHealthy('FCP', metrics.fcp)) healthyCount++;
  if (metrics.ttfb && isMetricHealthy('TTFB', metrics.ttfb)) healthyCount++;

  const percentage = (healthyCount / totalMetrics) * 100;

  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

/**
 * Monitor Core Web Vitals using web-vitals package
 * Note: web-vitals package can be installed optionally for detailed monitoring
 */
export async function monitorWebVitals() {
  try {
    // Dynamically import web-vitals if available
    // @ts-ignore - web-vitals is optional
    const webVitals = await import('web-vitals').catch(() => null);
    
    if (!webVitals) {
      console.info('web-vitals not installed. Install it for detailed performance monitoring: pnpm add web-vitals');
      return;
    }

    const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;

    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  } catch (e) {
    console.warn('Error initializing web vitals monitoring:', e);
  }
}
