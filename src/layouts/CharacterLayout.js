import { useParams } from 'react-router-dom';
import { CharacterPage } from '../pages/CharacterPage';

export const CharacterLayout = () => {
    const { characterId } = useParams();

    return (
        <div>
            <CharacterPage characterId={characterId} />
        </div>
    );
};

