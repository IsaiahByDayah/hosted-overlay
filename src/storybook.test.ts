import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots"

HTMLCanvasElement.prototype.getContext = jest.fn()

initStoryshots({
  test: multiSnapshotWithOptions({}),
})
