import { MOCK_RESPONSES } from "@/app/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const ResponseCards = () => {
  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 w-6xl mx-auto">
      {
        Object.entries(MOCK_RESPONSES).map(([key, val]) => {
            return <ModelCard key={key} modelName={key} response={val}/>
        })
      }
    </div>
  )
}

const ModelCard = ({modelName, response}: {modelName: string, response: string}) => {
    return (
        <Card className="p-0">
            <CardHeader className="bg-primary/40 p-2">
                <CardTitle className="text-base">{modelName}</CardTitle>
                <CardDescription className="text-[11px] text-muted-foreground">gpt-4.1</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-secondary-foreground h-xl min-h-37.5 pb-4">
                {response}
            </CardContent>
        </Card>
    )
}

export default ResponseCards
