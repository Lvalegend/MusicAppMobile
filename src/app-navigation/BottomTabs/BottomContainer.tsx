import React, { memo } from 'react';
import BottomTabs from './navigation-bottom-tabs';
import { Box } from 'native-base';
import colors from '@assets/colors/global_colors';

const BottomContainer = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  return (
    <Box style={{ flex: 1 }} >
      <BottomTabs navigation={navigation} route={route} />
    </Box>
  );
};

export default memo(BottomContainer);
