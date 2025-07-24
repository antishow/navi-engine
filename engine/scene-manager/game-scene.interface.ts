export interface GameScene {
  url: string,
  prefabs: string[],
  onLoad: Function,
  onProgress: Function,
  onError: Function,
}