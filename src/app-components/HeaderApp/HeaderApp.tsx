import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";

interface HeaderAppProps {
  title: string;
  icon?: any;
  style?: any;
}

const HeaderApp: React.FC<HeaderAppProps> = ({ title, icon, style }) => {
  return (
    <Box style={[{...styles_c.row_between ,  marginHorizontal: 20 }, style]}>
      <Text fontSize={sizes._30sdp} fontWeight="bold">
        {title}
      </Text>
      {icon && (
        <Box>
          {icon}
        </Box>
      )}
    </Box>
  );
};

export default HeaderApp;
