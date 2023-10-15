

const Loading = () => {
    return (
        <div>
            <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"> </div>
            </div>
        </div>
    );
};

export default Loading;
