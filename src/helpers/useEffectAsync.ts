import {useEffect} from 'react';

export default function useEffectAsync(effect: () => void, inputs: any) {
  useEffect(() => effect(), inputs); // eslint-disable-line react-hooks/exhaustive-deps
}
