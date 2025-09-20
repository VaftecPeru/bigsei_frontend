export const MessagePending = ({title = "", text = ""}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
            <div className="bg-purple-100 border border-purple-400 text-purple-800 px-16 py-14 rounded-lg shadow-lg">
                <div><strong className="font-bold text-2xl">{title}</strong></div>
                <div><strong className="font-bold text-2xl">{text}</strong></div>
            </div>
        </div>
    )
}