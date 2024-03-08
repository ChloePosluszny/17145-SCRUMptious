export default function HardwareSetDisplay ({hardwareSet}) {
    return (
        <h1 style={styles.hardwareSetDisplay}>
            {hardwareSet.name}: {hardwareSet.available}/{hardwareSet.capacity}
        </h1>
    );
}

const styles = {
    hardwareSetDisplay: {
        border: '2px',
        borderStyle: 'solid',
        borderColor: 'black',
        padding: '10px',
        margin: '10px'
    }
};