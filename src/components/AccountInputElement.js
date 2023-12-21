export default function InputElement({
  type,
  name,
  placeholder,
  additionalStyles,
  label,
  options,
  onChange,
  elementError,
  value,
  disabled,
  labelTextColor,
}) {
  const handleChange = (event) => {
    const inputValue = event.target.value
    onChange(name, inputValue)
  }

  if (type === 'select') {
    return (
      <div style={styles.inputElementContainer}>
        <p style={styles.label}>
          <span style={styles.required}>*</span> {label}
        </p>
        <Dropdown
          name={name}
          options={options}
          additionalStyles={additionalStyles}
          onChange={handleChange}
          disabled={disabled}
        />
        <p style={styles.error}>{elementError}</p>
      </div>
    )
  }

  return (
    <div style={styles.inputElementContainer}>
      <p style={labelTextColor ? styles.whiteTextLabel : styles.label}>
        <span style={styles.required}>*</span> {label}
      </p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        style={{ ...styles.inputField, ...additionalStyles }}
        required
        disabled={disabled}
      />
      <p style={styles.error}>{elementError}</p>
    </div>
  )
}

function Dropdown({ options, additionalStyles, onChange, disabled, name }) {
  return (
    <select
      style={{ ...styles.inputField, ...additionalStyles }}
      onChange={onChange}
      disabled={disabled}
      name={name}>
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

const styles = {
  inputField: {
    width: '100%',
    fontSize: '15px',
    height: '40px',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    border: '1px solid gray',
    paddingLeft: '5px',
    paddingBottom: '10px',
  },
  inputElementContainer: {
    textAlign: 'left',
  },
  label: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000000',
  },
  whiteTextLabel: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  required: {
    color: '#FF5C5C',
  },
  error: {
    color: '#FF5C5C',
  },
}
