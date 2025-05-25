import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

export const SearchBar = ({ className = '' }: { className: string }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => setSearchTerm(term);

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search ..."
        className="h-10 w-130 pl-9 bg-white border text-forground focus:ring-2 focus:ring-gray-300"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
