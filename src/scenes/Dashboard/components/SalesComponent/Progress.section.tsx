import { View, Text, StyleSheet } from 'react-native';
import { useProfileStore } from '@stores/ProfileStore.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import Colors, {
    ColorSchemeGradients,
    IColorSchemeGradients,
    IColorSchemes,
} from '@themes/colors.ts';
import { IDashboardSummarySection } from '@scenes/Dashboard/hooks/useDashboardSession.ts';
import { Session } from '@models/Session.ts';
import { getMinutesDuration } from '@utils/time.utils.ts';
import { OutlineGlyphMapType } from '@ant-design/icons-react-native/lib/outline';

interface IProps {
    activeSession?: Session;
    dashboardSummary?: IDashboardSummarySection[];
}

const ProgressSection: React.FC<IProps> = ({
    activeSession,
    dashboardSummary,
}) => {
    const { profile } = useProfileStore();

    console.log('dashboardSummary', dashboardSummary)
    const renderTopSection = () => {
        const title =
            profile!.role > 0 ? 'Status Penjualan' : 'Kinerja Penjualanmu';

        if (activeSession?.status === 'active') {
            const duration =
                getMinutesDuration(activeSession.pick_time as string) / 60;

            let infoBoxContent: {
                title: string;
                label: string;
                icon: OutlineGlyphMapType;
                color: IColorSchemes;
            } = {
                title: 'Sesi sedang aktif...',
                label: 'Hati-hati di jalan!. Jangan lupa bersikap ramah kepada merchant',
                icon: 'solution',
                color: 'royalBlue',
            };

            if (duration > 9) {
                infoBoxContent = {
                    title: 'Terlalu lama bekerja!',
                    label: 'Kamu sudah terlalu lama di luar sejak terakhir check-in di gudang, segera kembali.',
                    icon: 'info-circle',
                    color: 'redRuby',
                };
            }

            return (
                <View
                    style={[
                        styles.topSectionContainer,
                        {
                            backgroundColor:
                                Colors[
                                    `${infoBoxContent.color}${ColorSchemeGradients.Min2}` as `${IColorSchemes}${IColorSchemeGradients}`
                                ],
                        },
                    ]}
                >
                    <View>
                        <IconOutline
                            name={infoBoxContent.icon}
                            color={Colors[infoBoxContent.color]}
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>
                            {infoBoxContent.icon}
                        </Text>
                        <Text>{infoBoxContent.label}</Text>
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
                {dashboardSummary?.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.baseProgressSection,
                            { backgroundColor: item.color },
                        ]}
                    >
                        <Text style={styles.progressSectionTitle}>
                            {item.label}
                        </Text>
                        <Text style={styles.progressSectionValue}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderTopSection()}
            {renderProgressSection()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
    },
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
