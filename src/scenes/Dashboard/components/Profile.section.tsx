import { View, Text } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useProfileStore } from '@stores/ProfileStore.ts';

const ProfileSection = () => {
  const { profile } = useProfileStore();
  return (
    <View>
      <View>
        <View style={{ borderRadius: 50, width: 50, height: 50 }}>
          <IconOutline name={'user'} size={50} />
        </View>
      </View>
      <View>
        <Text>{profile?.full_name}</Text>
        <Text>{(profile?.role ?? 0) > 0 ? 'Supervisor' : 'Sales'}</Text>
      </View>
    </View>
  );
};

export default ProfileSection;
