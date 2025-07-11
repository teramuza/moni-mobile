import { View, Text, StyleSheet } from 'react-native';
import { useProfileStore } from '@stores/ProfileStore.ts';
import { useSessionStore } from '@stores/SessionStore.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import Colors from '@themes/colors.ts';

const ProgressSection = () => {
  const { profile } = useProfileStore();
  const { session } = useSessionStore();

  const renderTopSection = () => {
    const title =
      profile!.role > 0 ? 'Status Penjualan' : 'Kinerja Penjualanmu';

    if (session?.status === 'active') {
      return (
        <View style={styles.topSectionContainer}>
          <View>
            <IconOutline name="solution" color={Colors.royalBlueMin2} />
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '700' }}>
              {'Sesi sedang aktif...'}
            </Text>
            <Text>
              {
                'Hati-hati di jalan!. Jangan lupa bersikap ramah kepada merchant'
              }
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: '200' }}>{title}</Text>
      </View>
    );
  };

  const renderProgressSection = () => {
    return (
      <View style={styles.progressSectionContainer}>
        <View
          style={[
            styles.baseProgressSection,
            { backgroundColor: Colors.bluePurpleMin2 },
          ]}
        >
          <Text style={styles.progressSectionTitle}>{'Titik Merchant'}</Text>
          <Text style={styles.progressSectionValue}>{'1.6rb'}</Text>
        </View>
        <View
          style={[
            styles.baseProgressSection,
            { backgroundColor: Colors.royalBlueMin2 },
          ]}
        >
          <Text style={styles.progressSectionTitle}>{'Sesi Aktif'}</Text>
          <Text style={styles.progressSectionValue}>{103}</Text>
        </View>
        <View
          style={[
            styles.baseProgressSection,
            { backgroundColor: Colors.mossGreenMin2 },
          ]}
        >
          <Text style={styles.progressSectionTitle}>
            {'Barang terjual hari ini'}
          </Text>
          <Text style={styles.progressSectionValue}>{'10.2rb'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 12, flex: 1 }}>
      {renderTopSection()}
      {renderProgressSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  topSectionContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  progressSectionContainer: {
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  baseProgressSection: {
    height: 100,
    maxWidth: 125,
    flex: 1,
    borderRadius: 22,
    padding: 12,
    marginHorizontal: 4,
    justifyContent: 'space-between',
  },
  progressSectionTitle: {
    fontSize: 12,
    fontWeight: '300',
    maxWidth: 75,
  },
  progressSectionValue: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default ProgressSection;
