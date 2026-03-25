import React, { useEffect, useRef } from 'react';

import { cn } from '@app/lib/utils';

import { Spinner } from '../ui/Spinner';

type InfiniteScrollContainerProps = {
  isLoading: boolean;
  rootMargin?: string;
  infiniteScroll?: {
    nextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  };
  children: React.ReactNode;
};

export function InfiniteScrollContainer({
  isLoading,
  rootMargin = '40%',
  infiniteScroll,
  children,
}: InfiniteScrollContainerProps) {
  const spinnerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!spinnerRef.current || !infiniteScroll) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!infiniteScroll.hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !infiniteScroll.isFetchingNextPage) {
          infiniteScroll.nextPage();
        }
      },
      {
        root: null,
        rootMargin,
      },
    );

    observer.observe(spinnerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, infiniteScroll]);

  return (
    <div>
      {children}

      <div
        className={cn(
          'grid w-full place-items-center',
          !infiniteScroll?.isFetchingNextPage && 'size-0',
        )}
        ref={spinnerRef}
      >
        <Spinner
          className={cn(!infiniteScroll?.isFetchingNextPage && 'size-0')}
        />
      </div>
    </div>
  );
}
