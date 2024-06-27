import { FaUser, FaStore, FaMoneyBillWave, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

const LogsCard = ({ dataArr }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataArr.length > 0 ? (
                dataArr.map((data) => (
                    <div key={data._id} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xs md:text-sm lg:text-base font-bold text-white bg-indigo-600 p-2 rounded">
                                {data._id}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <FaUser className="text-indigo-600 mr-2" />
                                <p className="text-sm font-medium">{data.employee.name}</p>
                            </div>
                            <div className="flex items-center">
                                <FaStore className="text-indigo-600 mr-2" />
                                <p className="text-sm font-medium">{data.store.name}</p>
                            </div>
                            <div className="flex items-center">
                                <FaMoneyBillWave className="text-indigo-600 mr-2" />
                                <p className="text-sm font-medium">Method: {data.paymentMethod}</p>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-green-500 mr-2" />
                                <p className="text-sm font-medium">Pending: ${data.pendingAmount}</p>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-red-500 mr-2" />
                                <p className="text-sm font-medium">Due: ${data.dueAmount}</p>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-blue-500 mr-2" />
                                <p className="text-sm font-medium">Received: ${data.paymentReceived}</p>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="text-yellow-500 mr-2" />
                                <p className="text-sm font-medium">Given: ${data.paymentGiven}</p>
                            </div>
                            <div className="flex items-center">
                                <FaInfoCircle className="text-indigo-600 mr-2" />
                                <p className="text-sm font-medium">Status: {data.subscriptionStatus}</p>
                            </div>
                            <div className="col-span-2 mt-4">
                                <p className="text-sm text-gray-700">{data.logDescription}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-full">No Logs found.</p>
            )}
        </div>
    );
};

export default LogsCard;
