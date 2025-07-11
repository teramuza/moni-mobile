import { StyleSheet, Text, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Colors from '@themes/colors.ts';

const ActionSection = () => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.actionBoxContainer,
          { backgroundColor: Colors.bluePurpleMin2 },
        ]}
      >
        <View style={styles.leftActionBox}>
          <IconOutline name={'file-protect'} size={25} />
        </View>
        <View style={styles.mainActionBox}>
          <Text
            style={[
              styles.titleActionBox,
              {
                color: Colors.bluePurplePlus2,
              },
            ]}
          >
            {'Check-in Approval'}
          </Text>
          <Text
            style={[
              styles.labelActionBox,
              {
                color: Colors.bluePurplePlus1,
              },
            ]}
          >
            {
              'Lihat request check-in yang pending.\nVerifikasi barang mereka disini'
            }
          </Text>
        </View>
        <View style={styles.rightActionBox}>
          <IconOutline name={'right'} size={20} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    marginTop: 120,
  },
  actionBoxContainer: {
    flex: 1,
    minHeight: 112,
    borderRadius: 18,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 22,
    marginBottom: 22,
  },
  leftActionBox: {
    width: 50,
    alignItems: 'center',
    paddingTop: 8,
  },
  iconActionBox: {},
  mainActionBox: {
    flex: 1,
    justifyContent: 'center',
  },
  titleActionBox: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 8,
  },
  labelActionBox: {
    fontSize: 14,
    fontWeight: '300',
  },
  rightActionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
});

export default ActionSection;
