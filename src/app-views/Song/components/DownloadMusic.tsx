import URL_API from '@app-helper/urlAPI';
import { Box, Text } from 'native-base';
import React, { useState } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import sizes from '@assets/styles/sizes';
import colors from '@assets/colors/global_colors';
import * as FileSystem from 'expo-file-system';
import showToastApp from '@app-components/CustomToast/ShowToastApp';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles_c from '@assets/styles/styles_c';
import { useSelector } from 'react-redux';

interface DownloadMusicProps {
  type: 'not_in_song' | 'in_song' | 'in_option';
}

const DownloadMusic: React.FC<DownloadMusicProps> = ({ type }) => {
  const {listOptionTabDataCurrent}= useSelector((state:any) => state.songScreen)
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadMusic = async () => {
    if (isDownloading) {
      showToastApp({
        type: 'info',
        title: 'Bài hát đang được tải xuống. Vui lòng chờ...'
      });
      return;
    }

    if (listOptionTabDataCurrent[0]?.data[0]?.song_url) {
      setIsDownloading(true); // Bắt đầu quá trình tải
      try {
        const fileName = listOptionTabDataCurrent[0]?.data[0]?.song_url?.split('/').pop();
        const filePath = FileSystem.documentDirectory + fileName;
        const result = await FileSystem.downloadAsync(
          `${URL_API}download/file?fileName=${fileName}`,
          filePath
        );

        if (Platform.OS === 'android') {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

          if (permissions.granted) {
            const fileContent = await FileSystem.readAsStringAsync(result.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              fileName,
              'application/octet-stream'
            )
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, fileContent, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                showToastApp({
                  type: 'success',
                  title: 'Bài hát đã được lưu vào thiết bị'
                });
              })
              .catch(() => {
                showToastApp({
                  type: 'error',
                  title: 'Không thể lưu bài hát vào thiết bị'
                });
              });
          } else {
            showToastApp({
              type: 'error',
              title: 'Không có quyền lưu vào thiết bị'
            });
          }
        } else {
          showToastApp({
            type: 'success',
            title: 'Bài hát đã được tải xuống và lưu vào bộ nhớ của ứng dụng!'
          });
        }
      } catch (error) {
        showToastApp({
          type: 'error',
          title: 'Có lỗi xảy ra khi tải bài hát.'
        });
      } finally {
        setIsDownloading(false);
      }
    } else {
      showToastApp({
        type: 'error',
        title: 'Đường dẫn bài hát không hợp lệ'
      });
    }
  };

  return (
    <Box>
      {type === 'in_song' &&
        <TouchableOpacity onPress={downloadMusic}>
          <Feather name="download" size={sizes._28sdp} color={colors.white} />
        </TouchableOpacity>
      }
      {type === 'not_in_song' &&
        <TouchableOpacity onPress={downloadMusic}>
          <Box alignItems={'center'}>
            <MaterialCommunityIcons name="download-circle-outline" size={sizes._28sdp} color={colors.black} />
            <Text>Tải xuống</Text>
          </Box>
        </TouchableOpacity>
      }
      {type === 'in_option' &&
        <TouchableOpacity onPress={downloadMusic}>
          <Box style={{...styles_c.row_direction_align_center, gap:10, padding:10}}>
            <MaterialCommunityIcons name="download-circle-outline" size={sizes._28sdp} color={colors.black} />
            <Text style={{...styles_c.font_text_16_400}}>Tải xuống</Text>
          </Box>
        </TouchableOpacity>
      }
    </Box>
  );
};

export default DownloadMusic;
