import ProfileSection from '@scenes/Dashboard/components/Profile.section.tsx';
import { View } from 'react-native';
import Colors from '@themes/colors.ts';
import ProgressSection from '@scenes/Dashboard/components/SalesComponent/Progress.section.tsx';
import ActionSection from '@scenes/Dashboard/components/Action.section.tsx';
import useDashboardSession from '@scenes/Dashboard/hooks/useDashboardSession.ts';

const DashboardScene = () => {
    const { activeSession, generateDashboardSummary } = useDashboardSession();
    return (
        <View
            style={{
                backgroundColor: Colors.neutralSecondaryBg,
                marginHorizontal: 12,
            }}
        >
            <ProfileSection />
            <ProgressSection
                activeSession={activeSession}
                dashboardSummary={generateDashboardSummary()}
            />
            <ActionSection />
        </View>
    );
};

export default DashboardScene;
