/* Credits: https://wattenberger.com/blog/react-hooks */

const useOnKeyPress = (targetKey, onKeyDown, onKeyUp, isDebugging=false) => {
  const [isKeyDown, setIsKeyDown] = useState(false)

  const onKeyDownLocal = useCallback(e => {
    if (isDebugging) console.log("key down", e.key, e.key != targetKey ? "- isn't triggered" : "- is triggered")
    if (e.key != targetKey) return
    setIsKeyDown(true)

    if (typeof onKeyDown != "function") return
    onKeyDown(e)
  })
  const onKeyUpLocal = useCallback(e => {
    if (isDebugging) console.log("key up", e.key, e.key != targetKey ? "- isn't triggered" : "- is triggered")
    if (e.key != targetKey) return
    setIsKeyDown(false)

    if (typeof onKeyUp != "function") return
    onKeyUp(e)
  })

  useEffect(() => {
    addEventListener('keydown', onKeyDownLocal)
    addEventListener('keyup', onKeyUpLocal)

    return () => {
      removeEventListener('keydown', onKeyDownLocal)
      removeEventListener('keyup', onKeyUpLocal)
    }
  }, [])

  return isKeyDown
}
