
  export const recordPlayerFinishAPI = async (playerName: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/player-finish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName }),
      });
      if (!response.ok) {
        throw new Error('Failed to record player finish');
      }
      return await response.json();
    } catch (error) {
      console.error('Error recording player finish:', error);
    }
  };