import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Colors, { ColorSchemeGradients, IColors } from '@themes/colors.ts';
import useActionBox from '@scenes/Dashboard/hooks/useActionBox.ts';

const ActionSection = () => {
    const { isNoSessionActive, generateActionBox } = useActionBox();
    const actionBox = generateActionBox();

    const renderInfoBox = () => {
        if (!isNoSessionActive) return null;
        return (
            <View style={styles.infoBoxContainer}>
                <View style={styles.infoBoxIconWrapper}>
                    <IconOutline name="info-circle" size={25} />
                </View>
                <View style={styles.infoBoxContentWrapper}>
                    <Text style={styles.infoBoxTitle}>
                        {'Pastikan kamu sudah bersiap'}
                    </Text>
                    <Text style={styles.infoBoxLabel}>
                        {
                            'Check-in harus di gudang dan sudah mempersiapkan bawaanmu'
                        }
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderInfoBox()}
            {actionBox.map((item, index) => (
                <TouchableOpacity
                    onPress={item?.onPress}
                    key={index}
                    style={[
                        styles.actionBoxContainer,
                        {
                            backgroundColor:
                                Colors[
                                    (item.color +
                                        ColorSchemeGradients.Min2) as IColors
                                ],
                        },
                    ]}
                >
                    <View style={styles.leftActionBox}>
                        <IconOutline name={item.icon} size={25} />
                    </View>
                    <View style={styles.mainActionBox}>
                        <Text
                            style={[
                                styles.titleActionBox,
                                {
                                    color: Colors[
                                        (item.color +
                                            ColorSchemeGradients.Plus2) as IColors
                                    ],
                                },
                            ]}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={[
                                styles.labelActionBox,
                                {
                                    color: Colors[
                                        (item.color +
                                            ColorSchemeGradients.Plus2) as IColors
                                        ],
                                },
                            ]}
                        >
                            {item.label}
                        </Text>
                    </View>
                    <View style={styles.rightActionBox}>
                        <IconOutline name={'right'} size={20} />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        marginTop: 120,
    },
    infoBoxContainer: {
        flexDirection: 'row',
        borderRadius: 22,
        paddingHorizontal: 12,
        paddingVertical: 24,
        backgroundColor: Colors.neutralBorder,
        alignItems: 'center',
        marginBottom: 22,
    },
    infoBoxIconWrapper: { paddingHorizontal: 8, paddingVertical: 8 },
    infoBoxContentWrapper: { paddingHorizontal: 8 },
    infoBoxTitle: {
        fontSize: 15,
        fontWeight: '600',
        paddingBottom: 8,
    },
    infoBoxLabel: {
        fontSize: 14,
        fontWeight: '300',
        maxWidth: 300,
    },
    actionBoxContainer: {
        flex: 1,
        minHeight: 112,
        borderRadius: 20,
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
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 8,
    },
    labelActionBox: {
        fontSize: 14,
        fontWeight: '300',
        maxWidth: 250,
    },
    rightActionBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
    },
});

export default ActionSection;
