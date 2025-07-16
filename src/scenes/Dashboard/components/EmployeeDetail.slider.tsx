import { forwardRef, useImperativeHandle, useRef } from 'react';
import { DefaultRefType } from '@type/base.ts';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetViewContainer from '@components/molecules/BottomSheet';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@themes/colors.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import useEmployeeSlider from '@scenes/SessionRequest/hooks/useEmployeeSlider.ts';
import LoadingSpinner from '@components/molecules/LoadingSpinner.tsx';
import { formatAktifSejak } from '@utils/time.utils.ts';
import LoggingUtils from '@utils/logging.utils.ts';

const userCircleSize = 100;

const EmployeeDetailSlider = forwardRef<DefaultRefType<number>>((_, ref) => {
    const bottomSheetRef = useRef<BottomSheet | null>(null);
    const { isLoading, employee, employeeSummary, fetchEmployeeData, onClose } =
        useEmployeeSlider();

    useImperativeHandle(ref, () => ({
        open: id => {
            bottomSheetRef?.current?.snapToIndex(0);
            fetchEmployeeData(id);
        },
        close: () => close,
    }));

    function close() {
        bottomSheetRef?.current?.close();
    }

    function handleOnClose() {
        onClose();
    }

    const renderProgressSection = () => {
        return (
            <View style={styles.progressSectionContainer}>
                {employeeSummary?.map((item, index) => (
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

    LoggingUtils.log('slider', employee, isLoading, employeeSummary);

    return (
        <BottomSheetViewContainer
            ref={bottomSheetRef}
            onClose={handleOnClose}
            bottomInset={18}
        >
            {!employee || isLoading ? (
                <View style={styles.loadingContainer}>
                    <LoadingSpinner color={Colors.royalBlueMin2} />
                    <Text style={styles.loadingLabel}>
                        sedang memuat data...
                    </Text>
                </View>
            ) : (
                <>
                    <View style={styles.container}>
                        <View style={styles.profileSectionContainer}>
                            <View style={styles.profileIconWrapper}>
                                <IconOutline
                                    name={'user'}
                                    size={userCircleSize - 5}
                                    color={Colors.royalBlueMin2}
                                />
                            </View>
                            <View style={styles.profileDetailWrapper}>
                                <Text style={styles.profileFullName}>
                                    {employee?.full_name}
                                </Text>
                                <Text style={styles.profileJobPosition}>
                                    {employee?.job_position}
                                </Text>
                                <Text style={styles.profileActiveDate}>
                                    {formatAktifSejak(employee?.createdAt)}
                                </Text>
                            </View>
                        </View>
                        {renderProgressSection()}
                    </View>
                </>
            )}
        </BottomSheetViewContainer>
    );
});

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        minHeight: 100,
    },
    loadingLabel: {
        fontStyle: 'italic',
        color: Colors.neutralSecondaryText,
        padding: 12,
    },
    container: {
        flex: 1,
    },
    profileSectionContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
    },
    profileIconWrapper: {
        borderRadius: userCircleSize / 2,
        width: userCircleSize,
        height: userCircleSize,
        backgroundColor: Colors.bluePurplePlus2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileDetailWrapper: {
        paddingHorizontal: 12,
    },
    profileFullName: {
        fontSize: 24,
        fontWeight: '500',
        paddingVertical: 4,
        color: Colors.bluePurplePlus1,
    },
    profileJobPosition: {
        paddingVertical: 4,
        color: Colors.bluePurplePlus1,
    },
    profileActiveDate: {
        fontSize: 12,
        color: Colors.neutralSecondaryText,
        fontWeight: '300',
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
        fontSize: 13,
        fontWeight: '300',
        maxWidth: 85,
    },
    progressSectionValue: {
        fontSize: 24,
        fontWeight: '700',
    },
});

export default EmployeeDetailSlider;
