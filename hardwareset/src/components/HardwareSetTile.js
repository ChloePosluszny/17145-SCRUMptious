export default function HardwareSetTile ({hardwareSet, checkedOut}) {
    return (
        <>
            <p style={styles.hardwareSetInfo}>{hardwareSet.name}: {checkedOut} checked out</p>
        </>
    )
}

const styles = {
    hardwareSetTile: {
        width: '650px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    hardwareSetInfo: {
        width: '170px'
    }
};