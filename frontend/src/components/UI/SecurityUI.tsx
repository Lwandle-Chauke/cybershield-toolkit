import type React from "react";
import { AlertCircle } from "lucide-react";

interface PageHeadingProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  icon,
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="page-heading">
      <div className="page-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="page-heading-copy">
        <p className="page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message,
}) => {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" aria-hidden="true">
        {icon}
      </span>

      <p>{message}</p>
    </div>
  );
};

interface ErrorNoticeProps {
  message: string;
}

export const ErrorNotice: React.FC<ErrorNoticeProps> = ({
  message,
}) => {
  return (
    <div className="error-notice" role="alert">
      <AlertCircle size={20} aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
};

interface FilePickerProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  accept?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FilePicker: React.FC<FilePickerProps> = ({
  id,
  icon,
  title,
  description,
  accept,
  onChange,
}) => {
  return (
    <label className="file-picker" htmlFor={id}>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={onChange}
        className="visually-hidden"
      />

      <span className="file-picker-icon" aria-hidden="true">
        {icon}
      </span>

      <strong>{title}</strong>

      {description && (
        <span className="file-picker-description">
          {description}
        </span>
      )}
    </label>
  );
};