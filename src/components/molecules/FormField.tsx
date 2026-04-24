import Label from '../atoms/Label';
import Input from '../atoms/Input';

type FocusColor = 'indigo' | 'blue' | 'green' | 'amber';

interface FormFieldProps {
  label:        string;
  placeholder?: string;
  type?:        string;
  hint?:        string;
  tag?:         string;
  span?:        boolean;
  focusColor?:  FocusColor;
  className?:   string;
}

export default function FormField({
  label,
  placeholder,
  type = 'text',
  hint,
  tag,
  span = false,
  focusColor = 'indigo',
  className = '',
}: FormFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`${span ? 'col-span-2' : ''} ${className}`}>
      <Label htmlFor={id} hint={hint} tag={tag}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
        focusColor={focusColor}
        readOnly
      />
    </div>
  );
}
