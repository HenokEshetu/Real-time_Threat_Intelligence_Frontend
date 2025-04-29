import React from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';
import { TopContainer } from '@/components/common/TopContainer';
import { TabsType, TopTab } from '@/components/common/TopTab';
import { FileOverview } from '@/components/observables/file/overview';
import { useFile } from '@/hooks/observables/useFiles';

export const FileObservablesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { file, loading, error } = useFile(id);
  const tabs = {
    titles: [
      'overview',
      'knowledge',
      'content',
      'analysis',
      'sightings',
      'data',
      'history',
    ],
    comoponents: [
      <FileOverview file={file} />,
      <div>Knowledge content here</div>,
      <div>Content content here</div>,
      <div>Analysis content here</div>,
      <div>Sightings content here</div>,
      <div>Data content here</div>,
      <div>History content here</div>,
    ],
  } as TabsType;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!file) return <ErrorMessage message="File not found" />;

  return (
    <div className="w-full flex flex-col">
      <TopContainer className="h-13 top-29">
        <h1 className="text-2xl max-w-[40%] font-semibold truncate">
          {file.name ||
            file.hashes.SHA_512 ||
            file.hashes.SHA_256 ||
            file.hashes.SHA_1 ||
            file.hashes.MD5 ||
            file.created_by_ref
              .replaceAll('identity--', '')
              .replaceAll('-', '')}
        </h1>
      </TopContainer>

      <TopTab tabs={tabs} triggerStyle="" />
    </div>
  );
};
