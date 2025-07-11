import ProfileSection from '@scenes/Dashboard/components/Profile.section.tsx';
import { View } from 'react-native';
import Colors from '@themes/colors.ts';
import ProgressSection from '@scenes/Dashboard/components/Progress.section.tsx';

const DashboardScene = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.neutralSecondaryBg,
        marginHorizontal: 12,
      }}
    >
      <ProfileSection />
      <ProgressSection />
    </View>
  );
};

export default DashboardScene;
