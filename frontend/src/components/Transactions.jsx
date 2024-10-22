export default function Transactions() {
  return (
    <div className="text-lg py-6 w-full">
      <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
        Depósitos recientes
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
          <p className="font-semibold">Red</p>
          <p>TRX</p>
        </div>
        <div className="py-2 px-3 bg-gray-600 rounded-xl">
          <p className="font-semibold">Dirección</p>
          <p className="break-words">loremlo</p>
        </div>
        <div className="py-2 px-3 bg-gray-600/90 rounded-xl">
          <p className="font-semibold">ID</p>
          <p className="break-words">loremlorem</p>
        </div>
        <div className="py-2 px-3 bg-gray-600 rounded-xl">
          <p className="font-semibold">Billetera</p>
          <p>Billetera de fondos</p>
        </div>
        <div className="py-2 px-3 bg-gray-600/90 rounded-xl">
          <p className="font-semibold">Billetera</p>
          <p>Billetera de fondos</p>
        </div>
      </div>
    </div>
  );
}
