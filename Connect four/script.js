document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const message = document.querySelector(".message");
    let currentPlayer = 1;
    const rows = 6;
    const cols = 7;
    const grid = [];

    // Create the grid dynamically
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid[row][col] = cell;
            board.appendChild(cell);
        }
    }

    // Add click event listener to each cell
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            cell.addEventListener("click", () => {
                dropPiece(colIndex);
            });
        });
    });

    // Function to drop a piece into a column
    function dropPiece(colIndex) {
        for (let row = rows - 1; row >= 0; row--) {
            if (!grid[row][colIndex].classList.contains("player1") && !grid[row][colIndex].classList.contains("player2")) {
                grid[row][colIndex].classList.add(`player${currentPlayer}`);
                if (checkWin(row, colIndex)) {
                    message.textContent = `Player ${currentPlayer} wins!`;
                    disableClicks();
                    return;
                }
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                message.textContent = `Player ${currentPlayer}'s turn`;
                return;
            }
        }
    }

    // Function to check for a win
    function checkWin(row, col) {
        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal /
            [-1, 1]   // diagonal \
        ];

        for (let dir of directions) {
            let count = 1;
            const [dirRow, dirCol] = dir;
            let r = row + dirRow;
            let c = col + dirCol;
            
            while (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(`player${currentPlayer}`)) {
                count++;
                r += dirRow;
                c += dirCol;
            }

            r = row - dirRow;
            c = col - dirCol;
            while (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains(`player${currentPlayer}`)) {
                count++;
                r -= dirRow;
                c -= dirCol;
            }

            if (count >= 4) {
                return true;
            }
        }

        return false;
    }

    // Function to disable further clicks after someone wins
    function disableClicks() {
        grid.forEach(row => {
            row.forEach(cell => {
                cell.removeEventListener("click", dropPiece);
            });
        });
    }
});
