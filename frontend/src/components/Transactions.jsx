export default function Transactions({ transactions }) {
  return (
    <div className="text-lg py-6 w-full">
      <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
        Balance Total
      </h1>
      <p className="text-base font-semibold lg:text-lg xl:text-xl">1500 USDT</p>
      <div
        className="grid grid-cols-2 p-3 gap-6 bg-gray-700/50 rounded-xl my-4
      xl:grid-cols-3"
      >
        <div className="py-1 px-3 bg-gray-600 rounded-xl">
          <p className="font-semibold">Fecha</p>
          <p>10/10/2021</p>
        </div>
        <div className="py-2 px-3 bg-gray-600/90 rounded-xl">
          <p className="font-semibold">Hora</p>
          <p>10:10 am</p>
        </div>
        <div className="py-2 px-3 bg-gray-600 rounded-xl">
          <p className="font-semibold">Dirección</p>
          <p className="break-words">TJvHKzFB44a21aYeYtQjQ9JUHT1RU8a1Su</p>
        </div>
        <div className="py-2 px-3 bg-gray-600/90 rounded-xl">
          <p className="font-semibold">Red Blockchain</p>
          <p className="break-words">Ethereum</p>
        </div>
        <div className="py-2 px-3 bg-gray-600 rounded-xl">
          <p className="font-semibold">Cantidad</p>
          <p>1500 USDT</p>
        </div>
        <div className="py-2 px-3 bg-gray-600/90 rounded-xl">
          <p className="font-semibold">Tipo de Transacción</p>
          <p>Depósito</p>
        </div>
      </div>
    </div>
  );
}
