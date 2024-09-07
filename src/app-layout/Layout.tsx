import { Box } from 'native-base';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children?: React.ReactNode;
  style?: any
  [key: string]: any;
}

const Container: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box {...props} w={'full'} height={'full'} style={style}>
        {children}
      </Box>
    </SafeAreaView>
  );
};

const Header: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <Box style={[styles.header, style]} {...props}>
      {children}
    </Box>
  );
};

interface ContentProps {
  scrollEnabled?: boolean;
  children?: React.ReactNode;
  style?: any
  [key: string]: any;
}

const Content: React.FC<ContentProps> = ({ scrollEnabled = true, style, children, ...props }) => {
  return (
    <Box style={[styles.content, style]} {...props}>
      <ScrollView scrollEnabled={scrollEnabled} style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
        {children}
      </ScrollView>
    </Box>
  );
};

const Footer: React.FC<Props> = ({ children, style, ...props }) => {
  return (
    <Box style={[styles.footer, style]} {...props}>
      {children}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
  },
  footer: {
    width: '100%',
  },
});

export {
  Container,
  Header,
  Content,
  Footer
};
