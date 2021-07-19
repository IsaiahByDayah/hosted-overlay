import { ComponentType, ReactNode } from "react"
import { DecoratorFunction, StoryContext } from "@storybook/addons"

const decorator =
  (Component: ComponentType<StoryContext>): DecoratorFunction<ReactNode> =>
  (story, context) =>
    <Component {...context}>{story()}</Component>

export default decorator
