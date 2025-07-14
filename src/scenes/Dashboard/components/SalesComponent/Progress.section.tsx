import { View, Text, StyleSheet } from 'react-native';
import { useProfileStore } from '@stores/ProfileStore.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import Colors, {
    ColorSchemeGradients,
    IColorSchemeGradients,
    IColorSchemes,
} from '@themes/colors.ts';
import { IDashboardSummarySection } from '@scenes/Dashboard/hooks/useDashboardSession.ts';
import { SessionStatus } from '@models/Session.ts';
import { getMinutesDuration } from '@utils/time.utils.ts';
import { OutlineGlyphMapType } from '@ant-design/icons-react-native/lib/outline';
import LoggingUtils from '@utils/logging.utils.ts';
import { useSessionStore } from '@stores/SessionStore.ts';

interface IProps {
    dashboardSummary?: IDashboardSummarySection[];
}

const ProgressSection: React.FC<IProps> = ({ dashboardSummary }) => {
    const { profile } = useProfileStore();
    const { session } = useSessionStore();

    const renderTopSection = () => {
        const title =
            profile!.role > 0 ? 'Status Penjualan' : 'Kinerja Penjualanmu';

        if (session?.status === SessionStatus.CHECKIN) {
            const duration =
                getMinutesDuration(session.pick_time as string) / 60;

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
                    <View style={styles.topSectionIconWrapper}>
                        <IconOutline
                            name={infoBoxContent.icon}
                            color={Colors[infoBoxContent.color]}
                            size={25}
                        />
                    </View>
                    <View style={styles.topSectionContentWrapper}>
                        <Text style={styles.topSectionTitle}>
                            {infoBoxContent.title}
                        </Text>
                        <Text style={styles.topSectionLabel}>
                            {infoBoxContent.label}
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
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 24,
        alignItems: 'center',
        marginBottom: 22,
    },
    topSectionIconWrapper: { paddingHorizontal: 8, paddingVertical: 8 },
    topSectionContentWrapper: { paddingHorizontal: 8 },
    topSectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        paddingBottom: 8,
    },
    topSectionLabel: {
        fontSize: 14,
        fontWeight: '300',
        maxWidth: 300,
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
