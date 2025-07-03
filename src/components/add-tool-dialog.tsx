
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Save, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Tool } from "@/lib/types";
import { summarizeTool } from "@/ai/flows/tool-summarizer";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

type FormValues = z.infer<typeof formSchema>;
type ToolFormData = Omit<Tool, "id" | "category">;

interface AddToolDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: ToolFormData) => void;
  initialData?: Tool | null;
  children?: React.ReactNode;
}

export function AddToolDialog({
  isOpen,
  onOpenChange,
  onSave,
  initialData,
}: AddToolDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
    },
  });

  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const mode = initialData ? "edit" : "add";

  React.useEffect(() => {
    if (isOpen) {
      form.reset(initialData || { name: "", description: "", url: "" });
    }
  }, [isOpen, initialData, form]);

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      onSave(values);
      onOpenChange(false);
    },
    [onSave, onOpenChange]
  );

  const handleAnalyzeUrl = React.useCallback(async () => {
    const url = form.getValues("url");
    const isUrlValid = await form.trigger("url");
    if (!isUrlValid) return;

    setIsAnalyzing(true);
    try {
      const result = await summarizeTool({ url });
      form.setValue("name", result.name, { shouldValidate: true });
      form.setValue("description", result.description, { shouldValidate: true });
    } catch (error) {
      console.error("Failed to analyze URL:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not retrieve details from the provided URL. Please fill them in manually.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [form, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Tool" : "Add a New Tool"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update the details for your tool."
              : "Add your own favorite web tool. Paste a URL and click Analyze to auto-fill the details."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAnalyzeUrl}
                      disabled={isAnalyzing}
                      className="flex-shrink-0"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      <span className="sr-only">Analyze URL</span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cool Color Picker" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short description of what this tool does."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {mode === "edit" ? (
                <Save className="mr-2 h-4 w-4" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              {mode === "edit" ? "Save Changes" : "Add Tool"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
