import { useState } from "react";
import { TextStyle } from "react-native";
import WheelPicker from "react-native-wheely";

export default function XPANumberPicker({
  onChange,
  options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  selectedIndex = 0,
  itemTextStyle = { fontSize: 22 }
}:
  Readonly<{
    onChange: (option: string) => void,
    options?: string[],
    selectedIndex?: number,
    itemTextStyle?: TextStyle
  }>
) {
  const [index, setIndex] = useState(selectedIndex)

  return (
    <WheelPicker selectedIndex={index}
      options={options}
      itemTextStyle={itemTextStyle}
      onChange={(i) => {
        setIndex(i)
        onChange(options[i])
      }}
    />
  )
}
