import { View, Text } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useProfileStore } from '@stores/ProfileStore.ts';
import Colors from "@themes/colors.ts";

const ProfileSection = () => {
  const { profile } = useProfileStore();

  const userCircleSize = 100;

  return (
    <View style={{flexDirection: 'row', marginHorizontal: 26, marginTop: 100, marginBottom: 50}}>
      <View>
        <View style={{ borderRadius: userCircleSize/2, width: userCircleSize, height: userCircleSize, backgroundColor: Colors.bluePurplePlus2 }}>
          <IconOutline color={Colors.royalBlueMin2} name={'user'} size={userCircleSize} />
        </View>
      </View>
      <View style={{justifyContent: 'center', marginHorizontal: 22}}>
        <Text style={{fontSize: 24, fontWeight: '500', color: Colors.bluePurplePlus1}}>{profile?.full_name}</Text>
        <Text style={{fontSize: 16, fontWeight: '300', color: Colors.bluePurplePlus1}}>{(profile?.role ?? 0) > 0 ? 'Supervisor' : 'Sales'}</Text>
      </View>
    </View>
  );
};

export default ProfileSection;
