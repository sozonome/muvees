import { FormControl, Input } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

const SearchBox = () => {
  const router = useRouter();

  const {
    query: { query },
  } = router;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeQuery = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const queryParam = e.target.value
        ? `?query=${e.target.value}&page=1`
        : '';

      router.push(`/movies/search${queryParam}`);
    }, 500),
    []
  );

  return (
    <FormControl marginY={2}>
      <Input
        type="text"
        defaultValue={query}
        onChange={handleChangeQuery}
        placeholder="Movie Title"
        borderRadius={24}
        fontSize="sm"
      />
    </FormControl>
  );
};

export default SearchBox;
