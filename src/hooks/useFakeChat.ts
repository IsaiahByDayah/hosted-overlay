import faker from "faker"

import { Message } from "lib/types"

interface UseFakeChatProps {
  count?: number
  seed?: number
  sentMessageEvery?: number
}
const useFakeChat = ({
  count = 10,
  sentMessageEvery = 4,
  seed,
}: UseFakeChatProps): Message[] => {
  if (seed) faker.seed(seed)

  return Array(count)
    .fill(null)
    .map((_, index) => {
      return {
        id: `${index}`,
        username: faker.internet.userName(),
        message: faker.lorem.sentences(),
        color: faker.commerce.color(),
        sent: index % sentMessageEvery === 0,
      }
    })
}

export default useFakeChat
