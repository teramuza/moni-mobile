import useEmployeeScene from '@scenes/Dashboard/hooks/useEmployeeScene.ts';
import SceneContainer, {shadowStyle} from '@components/molecules/SceneContainer.tsx';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Colors from '@themes/colors.ts';
import { IconOutline } from '@ant-design/icons-react-native';
import { Profile } from '@models/Profile.ts';
import {useBottomSheetRefs} from "@components/molecules/BottomSheet/BottomSheetProvider.tsx";

const EmployeeScene = () => {
    const { employees } = useEmployeeScene();
    const { refs } = useBottomSheetRefs();

    const renderItem = ({ item }: { item: Profile }) => {
        const onPress = () => {
            refs.employeeDetailSlider?.current?.open(item.id);
        };
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[
                    styles.shadow,
                    styles.actionBoxContainer,
                    {
                        backgroundColor: Colors.mintWhite,
                    },
                ]}
            >
                <View style={styles.leftActionBox}>
                    <IconOutline name="user" size={25} />
                </View>
                <View style={styles.mainActionBox}>
                    <Text
                        style={[
                            styles.titleActionBox,
                            {
                                color: Colors.bluePurplePlus2,
                            },
                        ]}
                    >
                        {item.full_name}
                    </Text>
                    <Text
                        style={[
                            styles.labelActionBox,
                            {
                                color: Colors.bluePurplePlus1,
                            },
                        ]}
                    >
                        {item.job_position}
                    </Text>
                </View>
                <View style={styles.rightActionBox}>
                    <IconOutline name={'right'} size={20} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SceneContainer>
            <View style={styles.header}>
                <Text style={styles.headerText}>Data Pegawai</Text>
            </View>
            <View style={{flex: 1, marginTop: 20}}>
                <FlatList renderItem={renderItem} data={employees} />
            </View>
        </SceneContainer>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {
        paddingTop: 80,
        paddingHorizontal: 22,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '300',
        color: Colors.bluePurplePlus1,
        padding: 12,
    },
    actionBoxContainer: {
        flex: 1,
        minHeight: 112,
        borderRadius: 20,
        flexDirection: 'row',
        marginHorizontal: 32,
        borderWidth: 1,
        borderColor: Colors.neutralBorder,
        paddingHorizontal: 12,
        paddingVertical: 22,
        marginBottom: 22,
    },
    leftActionBox: {
        width: 50,
        alignItems: 'center',
        paddingTop: 8,
    },
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
    shadow: {
        ...shadowStyle(),
    },
});

export default EmployeeScene;
