import './CheckBox.scss';

interface CheckBoxProps {
  disabled: boolean;
  checked: boolean;
  onChange?: (isSelected: boolean) => void;
}

export default function CheckBox({
  disabled,
  checked,
  onChange,
}: CheckBoxProps) {
  return (
    <input
      className="checkbox"
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={() => onChange?.(!checked)}
    />
  );
}
