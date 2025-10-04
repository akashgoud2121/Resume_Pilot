
'use client';

import { useState } from 'react';

export const useAiFeedback = () => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  return {
    feedback,
    setFeedback,
    isFeedbackVisible,
    setIsFeedbackVisible,
  };
};
