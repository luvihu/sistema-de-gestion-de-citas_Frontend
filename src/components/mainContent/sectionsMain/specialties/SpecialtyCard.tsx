
interface SpecialtyCardProps {
  specialty: {
    id: string;
    name: string;
   icon: JSX.Element;
  };
  onClick: () => void;
}


const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty, onClick }) => {
  return (
    <div
      className="p-2 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer transition hover:shadow-xl"
      onClick={onClick}
    >
      <div className="w-16 h-16 mb-2">
        {specialty.icon}
      </div>
      <p className="text-center font-semibold text-cyan-950 text-xl">{specialty.name}</p>
    </div>
  );
};

export default SpecialtyCard;
