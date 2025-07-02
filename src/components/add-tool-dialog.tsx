
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Save } from "lucide-react";

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
              : "Add your own favorite web tool to your LocalOpen dashboard."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
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
