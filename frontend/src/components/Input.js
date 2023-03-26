function Input({
  value,
  error,
  onChange,
  additionalClassName,
  additionalErrorClassName,
  ...props
}) {
  return (
    <label className="form__input-wrap">
      <input
        className={
          `form__input${
            additionalClassName ? ` ${additionalClassName}` : ''
          }${error ? ' form__input_type_error' : ''}`
        }
        value={value}
        onChange={onChange}
        {...props}
      />
      <span
        className={
          `form__error${
            additionalErrorClassName ? ` ${additionalErrorClassName}` : ''
          }${error ? ' form__error_visible' : ''}`
        }
      >
        {error}
      </span>
    </label>
  );
}

export default Input;
