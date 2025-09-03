import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { HiPaperClip, HiPaperAirplane, HiX } from "react-icons/hi";
import { messageSchema } from "@/utils/validators";
import Image from "next/image";
import { FormikHelpers } from "formik";

interface MessageInputProps {
  onSendMessage: (content?: string, image?: File) => Promise<void>;
  disabled?: boolean;
}

interface MessageFormValues {
  content: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (
    values: MessageFormValues,
    { resetForm }: FormikHelpers<MessageFormValues>
  ) => {
    if (!values.content.trim() && !selectedImage) return;

    try {
      await onSendMessage(
        values.content.trim() || undefined,
        selectedImage || undefined
      );
      resetForm();
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <Image
            src={imagePreview}
            alt="معاينة الصورة المرفقة"
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-error-600 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
          >
            <HiX className="w-4 h-4" />
          </button>
        </div>
      )}

      <Formik
        initialValues={{ content: "" }}
        validationSchema={messageSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, submitForm }) => (
          <Form className="flex items-end gap-3">
            {/* Attachment Button */}
            <div className="flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="p-3 text-text-secondary hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full disabled:opacity-50 transition-all duration-200"
              >
                <HiPaperClip className="w-5 h-5" />
              </button>
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <Field
                name="content"
                as="textarea"
                rows={1}
                placeholder="اكتب رسالة..."
                disabled={disabled}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 resize-none disabled:opacity-50 transition-colors duration-200 bg-white"
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (
                      (values.content.trim() || selectedImage) &&
                      !isSubmitting
                    ) {
                      submitForm();
                    }
                  }
                }}
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-error-500 text-xs mt-1 font-medium"
              />
            </div>

            {/* Send Button */}
            <div className="flex-shrink-0">
              <button
                type="submit"
                disabled={
                  disabled ||
                  isSubmitting ||
                  (!values.content.trim() && !selectedImage)
                }
                className="btn-send p-3 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <HiPaperAirplane className="w-5 h-5 transform rotate-90" />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageInput;
