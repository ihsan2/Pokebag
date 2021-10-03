import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const index = ({disabled, loading, children, onPress, style, stroke}) => {
  if (stroke) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.btn, styles.stroke, style]}
        onPress={onPress}>
        {!loading ? (
          <Text style={[styles.text, {color: '#0E61FE'}]}>{children}</Text>
        ) : (
          <ActivityIndicator color={'#0E61FE'} />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        style,
        {backgroundColor: disabled ? '#AAA' : '#0E61FE'},
      ]}
      onPress={onPress}>
      {!loading ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <ActivityIndicator color={'#fff'} />
      )}
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  stroke: {
    borderWidth: 1,
    borderColor: '#0E61FE',
  },
});
