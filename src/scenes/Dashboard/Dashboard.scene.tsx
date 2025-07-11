import ProfileSection from '@scenes/Dashboard/components/Profile.section.tsx';
import { View } from 'react-native';
import Colors from '@themes/colors.ts';
import ProgressSection from '@scenes/Dashboard/components/Progress.section.tsx';
import ActionSection from "@scenes/Dashboard/components/Action.section.tsx";

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
        <ActionSection />
    </View>
  );
};

export default DashboardScene;
