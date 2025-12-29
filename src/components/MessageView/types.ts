export interface RootProps {
  isReceived: boolean;

  children: React.ReactNode;
}

export interface BottomComposerProps {
  icon: string;

  timestamp: Date;

  isReceived: boolean;
}
