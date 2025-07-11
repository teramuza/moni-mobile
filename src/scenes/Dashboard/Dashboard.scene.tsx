import ProfileSection from '@scenes/Dashboard/components/Profile.section.tsx';
import { View } from 'react-native';
import Colors from '@themes/colors.ts';

const DashboardScene = () => {
  return (
    <View style={{ backgroundColor: Colors.neutralSecondaryBg }}>
      <ProfileSection />
    </View>
  );
};

export default DashboardScene;
