📈 Diagram
Here's a very simple visual of your Perceptron with Bias that we have created:
    [x] --- (w0) ---\
                     \
    [y] --- (w1) -----> (+) ---> sign(sum)
                     /
  [bias=1] -(w2) ----/

Step | Action
1 | Multiply each input with its weight
2 | Add them all together
3 | Apply sign(sum)
4 | Update weights (including bias weight) during training

🚀 Why bias is important?
Because it allows the decision boundary (line) to be shifted up or down,
not always forced through the origin (0,0).

Without bias, the line can only rotate.
With bias, the line can rotate AND translate — making it much more flexible!

🎯 Summary
Inputs = [x, y, 1]

Weights = [w0, w1, biasWeight]

Sum = x*w0 + y*w1 + 1*biasWeight

Decision = sign(sum)


How classified line is drawn with latest tunable parameters?

(w0 * x) + (w1 * y) + (w2 * 1) = 0

y = ((-w0 / w1) * x) + (-w2 / w1)

Steps to remember normalization:
- When I CREATE a point for ML → normalize
- When I TRAIN perceptron → work in normalized space (including parameters tuning)
- When I DRAW something on canvas → use raw pixel space, no normalization
