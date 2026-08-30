import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { EyeIcon, EyeOffIcon } from '@/components/icons';
import { Colors, Radii } from '@/constants/colors';

type BrandTextFieldProps = Omit<TextInputProps, 'style'> & {
  icon: React.FC<SvgProps>;
  /** Renders the eye toggle and starts the field masked. */
  secure?: boolean;
};

export function BrandTextField({
  icon: Icon,
  secure = false,
  onFocus,
  onBlur,
  ...inputProps
}: BrandTextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const EyeToggle = revealed ? EyeOffIcon : EyeIcon;

  return (
    <View style={[styles.field, focused && styles.fieldFocused]}>
      <Icon width={22} height={22} color={Colors.primary} />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.placeholder}
        secureTextEntry={secure && !revealed}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...inputProps}
      />
      {secure && (
        <Pressable
          onPress={() => setRevealed((value) => !value)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={revealed ? 'Hide password' : 'Show password'}>
          <EyeToggle width={22} height={22} color={Colors.placeholder} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: Radii.input,
    paddingHorizontal: 16,
    height: 58,
  },
  fieldFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    // The web build draws a browser focus ring inside the field, which fights
    // the rounded border. `outlineStyle` is web-only and absent from the
    // native style types, hence the cast.
    ...Platform.select({ web: { outlineStyle: 'none' } as object, default: {} }),
  },
});
